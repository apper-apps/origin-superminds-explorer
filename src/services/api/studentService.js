import studentsData from '@/services/mockData/students.json';

class StudentService {
  constructor() {
    this.students = [...studentsData];
  }

  async getAll() {
    await this.delay(200);
    return [...this.students];
  }

  async getById(id) {
    await this.delay(200);
    return this.students.find(student => student.Id === parseInt(id));
  }

  async getCurrentStudent() {
    await this.delay(200);
    return this.students[0]; // Return first student as current user
  }

  async updateStudent(id, updates) {
    await this.delay(300);
    const index = this.students.findIndex(student => student.Id === parseInt(id));
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates };
      return this.students[index];
    }
    throw new Error('Student not found');
  }

  async addPoints(id, points) {
    const student = await this.getById(id);
    if (student) {
      return await this.updateStudent(id, {
        totalPoints: student.totalPoints + points
      });
    }
    throw new Error('Student not found');
  }

  async addBadge(id, badge) {
    const student = await this.getById(id);
    if (student && !student.badges.includes(badge)) {
      return await this.updateStudent(id, {
        badges: [...student.badges, badge]
      });
    }
    return student;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new StudentService();