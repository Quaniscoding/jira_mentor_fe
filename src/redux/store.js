import { configureStore } from "@reduxjs/toolkit";
import getAllProject from './reducers/projects/getAllProject'
import getProjectCategory from './reducers/projects/getProjectCategory'
import getAllStatus from './reducers/task/getAllStatus'
import getAllPiority from './reducers/task/getAllPiority'
import getAllTaskType from './reducers/task/getAllTaskType'
import getListUserByProjectId from './reducers/users/getUserByProjectId';
import getTaskDetail from './reducers/task/getTaskDetail'
import getUserById from './reducers/users/getUserById'
export const store = configureStore({
  reducer: {
    getAllProject,
    getProjectCategory,
    getAllStatus,
    getAllPiority,
    getAllTaskType,
    getListUserByProjectId,
    getTaskDetail,
    getUserById,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});