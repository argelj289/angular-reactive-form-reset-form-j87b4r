import  { required,propArray  } from "@rxweb/reactive-form-validators"

export class Skill {
  @required()
  skillName:string;
}

export class User{
  
  @required()
  firstName : string;

  @propArray(Skill)
  skills:Skill[]

}