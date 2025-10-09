
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
 
const ALLOWED_SPECIALS = "@$.#!%*?&";
function escapeForCharClass(s: string): string {
  return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}
 

function passwordPolicyValidator(getUsername: () => string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
 
    if (!value) return { required: true };
 
    const errors: ValidationErrors = {};
 
    
    if (value.length < 8) {
      errors['minLength'] = { required: 8, actual: value.length };
    }
 
   
    if (!/[a-z]/.test(value)) errors['lowercase'] = true;
    if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
    if (!/\d/.test(value)) errors['digit'] = true;
 
    
    const specialsRegex = new RegExp(`[${escapeForCharClass(ALLOWED_SPECIALS)}]`);
    if (!specialsRegex.test(value)) errors['special'] = { allowed: ALLOWED_SPECIALS };
 

    if (/\s/.test(value)) errors['noSpaces'] = true;
 
    
    const username = String(getUsername?.() ?? '');
    if (username.trim() && value.trim().toLowerCase() === username.trim().toLowerCase()) {
      errors['sameAsUsername'] = true;
    }
 
    if (/(.)\1{2,}/.test(value)) errors['repeatRun'] = { limit: 2 };
 
    return Object.keys(errors).length ? errors : null;
  };
}
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  itemForm!: FormGroup;
 
  roles: string[] = ['Choose Role', 'BUSINESS', 'DRIVER', 'CUSTOMER'];
 
  showMessage = false;
  responseMessage: string | null = null;
  showError = false;
  errorMessage: string | null = null;
 

  @ViewChild('captchaCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private captchaText = '';
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,private router:Router
  ) {}
 
  ngOnInit(): void {
    
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['Choose Role', [Validators.required, this.validateRole]],
     
      captchaImageInput: ['', [Validators.required, Validators.minLength(4)]]
    });
 
   
    const pwdCtrl = this.itemForm.get('password');
    pwdCtrl?.setValidators([
      Validators.required,
      passwordPolicyValidator(() => this.itemForm.get('username')?.value || '')
    ]);
    pwdCtrl?.updateValueAndValidity({ emitEvent: false });
 
    
    this.itemForm.get('username')?.valueChanges.subscribe(() => {
      this.itemForm.get('password')?.updateValueAndValidity({ onlySelf: true });
    });
  }
 
  ngAfterViewInit(): void {
    this.generateCaptchaImage();
  }
 
 
  validateRole(control: AbstractControl): ValidationErrors | null {
    return control.value === 'Choose Role' ? { invalidRole: true } : null;
  }
 
  
  refreshCaptcha(): void {
    this.generateCaptchaImage();
  }
 
  private generateCaptchaImage(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
 
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
 
    
    this.captchaText = this.randomString(5, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
 
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 

    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
  
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${this.rand(50, 180)}, ${this.rand(50, 180)}, ${this.rand(50, 180)}, 0.6)`;
      ctx.beginPath();
      ctx.moveTo(this.rand(0, canvas.width), this.rand(0, canvas.height));
      ctx.lineTo(this.rand(0, canvas.width), this.rand(0, canvas.height));
      ctx.stroke();
    }
 
    
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 28px sans-serif';
    const y = canvas.height / 2;
 
    for (let i = 0; i < this.captchaText.length; i++) {
      const ch = this.captchaText[i];
      const angle = (this.rand(-15, 15) * Math.PI) / 180;
      const x = 15 + i * 30;
 
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${this.rand(20, 120)}, ${this.rand(20, 120)}, ${this.rand(20, 120)})`;
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    }
 
    
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(${this.rand(100, 200)}, ${this.rand(100, 200)}, ${this.rand(100, 200)}, 0.5)`;
      ctx.fillRect(this.rand(0, canvas.width), this.rand(0, canvas.height), 1, 1);
    }
 
    
    this.itemForm.get('captchaImageInput')?.reset();
  }
 
  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 
  private randomString(len: number, charset: string): string {
    let out = '';
    for (let i = 0; i < len; i++) {
      out += charset[this.rand(0, charset.length - 1)];
    }
    return out;
  }
 
  onRegister(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.showError = true;
      this.errorMessage = 'Please fix validation errors.';
      
      return;
    }
 
    // 👉 Validate image captcha before registration
    const typed = (this.itemForm.value.captchaImageInput || '').trim().toUpperCase();
    if (typed !== this.captchaText.toUpperCase()) {
      this.showError = true;
      this.errorMessage = 'Captcha text does not match. Please try again.';
      this.refreshCaptcha();
      return;
    }
 
    this.showError = false;
    this.errorMessage = null;
    this.showMessage = false;
    this.responseMessage = null;
 
    // Proceed to backend
    this.httpService.registerUser({
      username: this.itemForm.value.username,
      email: this.itemForm.value.email,
      password: this.itemForm.value.password,
      role: this.itemForm.value.role
      // Note: not sending captcha in payload; you can add it if you implement server-side verification
    }).subscribe({
      next: () => {
        this.showMessage = true;
        this.responseMessage = 'You have successfully registered!';
        this.itemForm.reset({
          username: '',
          email: '',
          password: '',
          role: 'Choose Role',
          captchaImageInput: ''
        });
        this.refreshCaptcha();
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error?.error || 'Registration failed.';
        console.error('Error during registration:', error);
        this.refreshCaptcha();
      }
    });
  }
 
  /** Getter to avoid strict template typing issues when reading error keys */
  get passwordErrors(): any | null {
    return this.itemForm.get('password')?.errors || null;
  }
}