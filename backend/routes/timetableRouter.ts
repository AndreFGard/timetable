import express, {Express, NextFunction, Request, Response} from "express";
const router = express.Router();
import { RenderTimeTable, RenderMainPage, renderClassList, getCourseDisplayInfoList} from "../controllers/timetableController";


router.get('/timetableeditor', RenderMainPage)
router.get('/timetable', RenderTimeTable)
router.get('/courses', renderClassList)
router.get('/getCourseDisplayInfoList', getCourseDisplayInfoList)

export default router;