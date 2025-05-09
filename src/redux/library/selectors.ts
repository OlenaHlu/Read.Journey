import { RootState } from "../store";

export const selectUserBooks = (userId: string) => (state: RootState) => {
  return state.library.usersBooks[userId] || [];
};
