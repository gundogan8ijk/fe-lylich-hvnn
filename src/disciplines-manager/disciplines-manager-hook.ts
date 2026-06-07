import { addDisciplineApi } from './disciplines-manager-service';
import { AddDisciplineRequest } from './disciplines-manager-type';

export { 
    addDisciplineAction
}

async function addDisciplineAction(departmentId: string, data: AddDisciplineRequest) {
    const res = await addDisciplineApi(departmentId, data);
    return res;
}
