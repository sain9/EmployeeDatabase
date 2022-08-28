import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  isTrue: boolean = false;
  change(){ this.isTrue = !this.isTrue;}
  
  
  formGroup!: FormGroup;
  
  // token:any = localStorage.getItem('token');
  constructor(
    private authService: AuthServiceService,private _router: Router,
    private _activatedRoute: ActivatedRoute) { 
      
    // if(!this.token){
    //   this.movetoLogin()
    //  }
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
    
  profileProcess(){

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

    movetoLogin() {
      this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
    }

}
