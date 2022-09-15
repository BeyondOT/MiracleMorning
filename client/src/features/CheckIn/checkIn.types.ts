interface Achievements {
  stars: number;
}

interface Streak {
  currentStreak: number;
  highestStreak: number;
  starStreak: number;
}

export interface User {
  _id: string;
  pseudo: string;
  email: string;
  password: string;
  picture: string;
  pictureKey: string;
  days: Date[];
  latestCheckIn: Date;
  streak: Streak;
  achievements: Achievements;
  roles: String;
  createdAt: string;
  updatedAt: string;
}