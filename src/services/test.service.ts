import { api } from "src/boot/axios";
import { ITestResponse } from "src/models/test.model";
import { FileService } from "./file.service";
import { Router } from "vue-router";
import { Notify } from "quasar";

export class TestService {
  static async getStudentTests(key: number, router: Router): Promise<Array<ITestResponse>> {
    const result = [];
    const discipline = await api.get(`/getDisciplines?by=key&id=${key}`).then((res) => res.data.Data[0]);

    if (!discipline.Entry_Test_Key) {
      router.push('/disciplines');
      
      Notify.create({
        color: 'blue-8',
        message: 'У данной дисциплины нет входного теста',
        timeout: 1000,
      })
    }

    const testTypes = await api.get('/getDiffList').then((res) => res.data.Data?.filter((type) => type.Sh_Name === 'enter'));
    const testResult = await api.get('/getTestList').then((res) => res.data?.Data?.filter((test) => test.Test_Type_Key !== 26 && !!testTypes.find((type) => type.Key === test.Test_Type_Key && type.Sh_Name === 'enter')))
    for await (const testItem of testResult) {
      const testItemResult = await api.get(`/getTest/${testItem.Key}`).then((res) => res.data.Data);
      testItemResult.Key = testItem.Key;
      testItemResult.Questions = await Promise.all(testItemResult.Questions.map(async (question) => {
        const answer = await Promise.all(question.Answer?.map(async (ans) => {
          let file = null;
          if (ans.Img?.File) {
            file = await FileService.getFileBase64(ans.Img.File)
          }

          return {
            ...ans,
            Img: file,
          }
        }))
        
        let Img = null;

        if (question.Img?.File) {
          Img = await FileService.getFileBase64(question.Img.File);
        }
        
        return {
          ...question,
          Img,
          Answer: answer
        }
      }))
      result.push(testItemResult);
    }
    
    const disciplineTest = await api.get(`/getTest/${discipline.Entry_Test_Key}`).then((res) => res.data.Data);
    disciplineTest.Key = discipline.Entry_Test_Key;

    for await (const question of disciplineTest.Questions) {
      if (question.Img?.File) {
        question.Img = await FileService.getFileBase64(question.Img.File);
      }

      question.Answer = await Promise.all(question.Answer.map(async (ans) => {
        let img = null;

        if (ans.Img?.File) {
          img = await FileService.getFileBase64(ans.Img.File);
        }

        return {
          ...ans,
          Img: img,
        }
      }))
    }

    result.push(disciplineTest);
    
    return result;
  }
}