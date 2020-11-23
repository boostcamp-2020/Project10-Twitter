type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

interface Student {
  id: number;
  name: string;
  grade: Grade;
}

interface ObjectWithID {
  id: number;
}

const studentsData: Array<Student> = [
  { id: 1, name: 'luka gram', grade: 'A' },
  { id: 2, name: 'seungjin', grade: 'F' },
  { id: 3, name: 'nana', grade: 'B' },
  { id: 4, name: 'heello', grade: 'D' },
  { id: 5, name: 'my', grade: 'A' },
  { id: 1000, name: 'bbb', grade: 'C' },
];

const studentNum = () => studentsData.length;
const students = (props: ObjectWithID) => {
  const id = props.id;
  let findOne = null;
  studentsData.forEach((student: Student) => {
    if (student.id === id) {
      findOne = student;
    }
  });
  return [findOne];
};

export { studentNum, students };
