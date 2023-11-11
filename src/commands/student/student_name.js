import * as fs from 'node:fs';
import { useAppStore } from "../../store/app"
export const LoadStudentName = async() =>{
    const appStore = useAppStore()
    const studentlist = []
    const testFolder = process.env.STUDENT_IMAGE_PLACE
    fs.readdirSync(testFolder).forEach(file => {
            studentlist.push(file.slice(0,-4))
        })
    console.log(studentlist)
    appStore.student_name = studentlist
}