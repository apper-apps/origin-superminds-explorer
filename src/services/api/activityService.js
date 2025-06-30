import activitiesData from '@/services/mockData/activities.json';

class ActivityService {
  constructor() {
    this.activities = [...activitiesData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.activities];
  }

  async getById(id) {
    await this.delay(200);
    return this.activities.find(activity => activity.Id === parseInt(id));
  }

  async getByType(type) {
    await this.delay(250);
    return this.activities.filter(activity => activity.type === type);
  }

  async completeActivity(id, score) {
    await this.delay(400);
    const index = this.activities.findIndex(activity => activity.Id === parseInt(id));
    if (index !== -1) {
      this.activities[index] = {
        ...this.activities[index],
        completed: true,
        score: score
      };
      return this.activities[index];
    }
    throw new Error('Activity not found');
  }

  async getCompletedCount() {
    await this.delay(200);
    return this.activities.filter(activity => activity.completed).length;
  }

  async getTotalPoints() {
    await this.delay(200);
    return this.activities
      .filter(activity => activity.completed)
      .reduce((total, activity) => total + activity.points, 0);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ActivityService();