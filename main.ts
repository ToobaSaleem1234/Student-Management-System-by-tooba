#! /usr/bin/env node

import inquirer from "inquirer"

console.log("\n\t WELCOME-TO-CODE-WITH-TOOBA\n\t")
class Student{
    static counter=10000;
    id:number
    name:string
    courses:string[]
    balance:number

    constructor(name:string){
    this.id=Student.counter++,
    this.name=name,
    this.courses=[],
    this.balance=1000
    }
    enroll_course(course:string){
        this.courses.push(course)
     }
    view_balance(){
        console.log(`${this.name}: Your balance is ${this.balance}`)
     }
     pay_fees(amount:number){
        this.balance-=amount
        console.log(`${amount} paid successfully of ${this.name}, Your remaining balance is ${this.balance}`)
     }
     show_status(){
       console.log(`ID:${this.id}`)
       console.log(`NAME:${this.name}`)
       console.log(`COURSES:${this.courses}`)
       console.log(`BALANCE: ${this.balance}`)
     }
}
class Student_Management{
   students: Student[]

   constructor(){
      this.students=[]
   }
   add_student(name:string){
 let student =new Student (name)
 this.students.push(student)
 console.log(`Student:${name} added successfully,ID:${student.id}`)
 }
  find_student(student_id:number){
   return this.students.find(std=> std.id=== student_id)
  }
  enroll_student(student_id:number, course:string){
   let student=this.find_student(student_id)
  if(student){
   student.enroll_course(course)
   console.log(`${student.name} enrolled successfully in ${course} course`)
  }  
 }
 view_student_balance(student_id:number){
   let student=this.find_student(student_id)
   if(student){
      student.view_balance()

   }
   else{ 
   console.log("Student not found")
   }
 }
  pay_fees(student_id:number, amount:number){
   let student=this.find_student(student_id)
   if(student){
    student.pay_fees(amount)
   }
   else{
      console.log("Student not found")
   }
  }
  show_student(student_id:number){
  let student=this.find_student(student_id)
  if(student){
   student.show_status()
  }
  else{
   console.log("Student not found")
  }
  }
}
 async function main() {
   console.log("=".repeat(120))
   console.log("\t STUDENT-MANAGEMENT-SYSTEM")
   console.log("=".repeat(120))
   let student_manager = new Student_Management()
   while(true){
      let choice=await inquirer.prompt([
         {
          name:"choices",
          type:"list",
          message:"Select an option",
          choices:
          [ "Add Student",
            "Enroll Course",
            "View Balance",
            "Pay Fees",
            "View Status",
            "Exit"  ]

         }
      ])
     switch(choice.choices){
    case "Add Student":
      let name_input= await inquirer.prompt([
         {
            name:"name",
            type:"input",
            message:"Enter a Student name"
         }
      ])
      student_manager.add_student(name_input.name)
    break;
    case"Enroll Course":
    let course_input=await inquirer.prompt([
      {
         name:"student_id",
         type:"number",
         message:"Enter a student ID"
      },
      {
         name:"course",
         type:"input",
         message:"Enter a course Name"
      }
    ])
      student_manager.enroll_student(course_input.student_id,course_input.course)
      break;
    case"View Balance":
    let balance_input=await inquirer.prompt([
      {
         name:"Student_id",
         type:"number",
         message:"Enter a student ID"
      }
    ])
     student_manager.view_student_balance(balance_input.  Student_id)
      break;
    case"Pay Fees":
    let fees_input= await inquirer.prompt([
      {
         name:"Student_id",
         type:"number",
         message:"Enter a student ID"
      },
      {
         name:"Amount",
         type:"number",
         message:"Enter a amount to be paid",
      }
    ])
      student_manager.pay_fees(fees_input.Student_id,fees_input.Amount)
       break;
    case"View Status":
     let status_input =await inquirer.prompt([
      {
         name:"Student_id",
         type:"number",
         message:"Enter a student ID"
      }
     ])
     student_manager.show_student(status_input.Student_id)
      break;
    case"Exit":
    console.log("Exiting....")
   process.exit();
    }
    }
    }
main()