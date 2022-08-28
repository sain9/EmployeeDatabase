import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  empForm : FormGroup;
  showModal:boolean = false;
  editMode:boolean = false;

  employees=new Subject<Employee[]>();
  selectedEmployee: Employee ;

  constructor(
    private fb: FormBuilder,
    private _empService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

    this.empForm = this.fb.group({
      _id: [''],
      name: ['Alex Johnson', Validators.required],
      position: ['Full Stack Developer', Validators.required]
    })
  }

  getEmployees(){
    this._empService.getEmployeeList().subscribe(
      (res) => {
        console.log(res);
        ++employees = res as Employee[];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onEmpSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
      
      if(this.editMode){
        this._empService.putEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log('Updated successfully');
            this.getEmployees();
            this.editMode = false;
          },
          (err) => {
            console.log(err);
          },
        );
      }else{
        this._empService.postEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log('Saved successfully');
            this.getEmployees();
          },
          (err) => {
            console.log(err);
          },
        );
      }
       
      this.empForm.reset();
      this.onCloseModal();

    }else{

      let key = Object.keys(this.empForm.controls);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.empForm.controls[data];
        // console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
  }

  onEditEmployee(emp:Employee){
    this.editMode = true;

    console.log(emp);
    this.showModal = true;
    this.selectedEmployee = emp;
    console.log(this.selectedEmployee);
    this.empForm.patchValue(this.selectedEmployee);
  }

  onDeleteEmployee(id){
    if(confirm('Do you want to delete this employee?')){
      // console.log(id);
      this._empService.deleteEmployee(id).subscribe(
        (res) => {
          console.log('Delete successfully');
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  onAddEmployee(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
  }

}


