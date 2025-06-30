import progressData from '@/services/mockData/progress.json';

class ProgressService {
  constructor() {
    this.progress = [...progressData];
  }

  async getProgress() {
    await this.delay(200);
    return this.progress[0];
  }

  async updateProgress(updates) {
    await this.delay(300);
    this.progress[0] = { ...this.progress[0], ...updates };
    return this.progress[0];
  }

  async incrementPhonicsLevel() {
    const current = await this.getProgress();
    return await this.updateProgress({
      phonicsLevel: current.phonicsLevel + 1
    });
  }

  async addVocabularyWords(count) {
    const current = await this.getProgress();
    return await this.updateProgress({
      vocabularyCount: current.vocabularyCount + count
    });
  }

  async incrementStoriesRead() {
    const current = await this.getProgress();
    return await this.updateProgress({
      storiesRead: current.storiesRead + 1
    });
  }

  async addWordsWritten(count) {
    const current = await this.getProgress();
    return await this.updateProgress({
      wordsWritten: current.wordsWritten + count
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ProgressService();