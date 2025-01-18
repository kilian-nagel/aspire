export interface Post {
  id: number;
  userId: string;
  chatId: number;
  content: string;
  createdAt: string;
  numberOfLikes: number;
  numberOfShares: number;
}
