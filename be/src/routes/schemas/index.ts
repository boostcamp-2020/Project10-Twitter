import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    studentNum: Int
    students(id : Int) : [Student]
  }
  enum Grade{ 
    A, 
    B, 
    C,
    D,
    F,
  } 
  type Student{
    id: Int
    name: String 
    grade: Grade
  }
`);

export default schema;
