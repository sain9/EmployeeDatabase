import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isTrue: boolean = false;
  change(){ this.isTrue = !this.isTrue;}


  formGroup!: FormGroup;

  token:any  = localStorage.getItem('token')
  isLog : string = '';
  constructor(private authService: AuthServiceService,private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
    //   if(this.token){
    //     this.movetoprofile();
    //  }  
      
    

    }

  ngOnInit(): void {
    this.initForm();
    // this.movetoprofile();
  }

  initForm () {
    this.formGroup = new  FormGroup ({
      email : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required])
    })
   
  };

  loginProcess(){

    if(this.formGroup?.valid)
      this.authService.login(this.formGroup.value).subscribe(
          result => {
              if(result.token) {
                  console.log('login success',result);
                  localStorage.setItem('token', result.token)
                  // alert(result);     
              }else {
                console.log('login fail', result)
                  // alert(result); 
              }
          }
    )}

    // movetoRegister() {
    //   this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
    // }
    // movetoprofile() {
    //   this._router.navigate(['../profile'], { relativeTo: this._activatedRoute });
    // }
}
