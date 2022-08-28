import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isTrue: boolean = false;
  change(){ this.isTrue = !this.isTrue;}


  formGroup!: FormGroup;

  // token: any = localStorage.getItem('token');
  constructor(
              private authService: AuthServiceService,private _router: Router,
              private _activatedRoute: ActivatedRoute) {
                // if(this.token){
                //   this.movetoprofile();
                // }
               }

  ngOnInit(): void {
    this.initForm();
  }

  
  initForm () {
    this.formGroup = new  FormGroup ({
      email : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required])
    })
  };

  registerProcess(){

    if(this.formGroup?.valid)
      this.authService.register(this.formGroup.value).subscribe(
          result => {
              if(result.token) {
                  localStorage.setItem('token', result.token);
                  console.log(result);
                  // alert(result.message);     
              }else {
                  // alert(result); 
              }
          }
    )}

    movetoLogin() {
      this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
    }

    // movetoprofile() {
    //   this._router.navigate(['../profile'], { relativeTo: this._activatedRoute });
    // }

}
