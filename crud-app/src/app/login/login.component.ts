import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isTrue: boolean = false;
  change(){ this.isTrue = !this.isTrue;}


  formGroup!: FormGroup;


  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
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
              if(result.success) {
                  console.log(result);
                  alert(result.message);     
              }else {
                  alert(result.message); 
              }
          }
    )}


}
