import { notify } from "@/_components/utils/Notify";
import { useOverviewStore } from "./overview-store";
import { useLecturerChartsStore } from "./lecturer-charts-store";
import { useResearchChartsStore } from "./research-charts-store";
import { getOverviewStatsApi, getLecturerChartsApi, getResearchChartsApi } from "./statistics-admin-service";

export {
  getOverviewStatsAction,
  getLecturerChartsAction,
  getResearchChartsAction,
};

async function getOverviewStatsAction() {
  const { setData, setLoading, selectedYear, selectedMonth } = useOverviewStore.getState();
  setLoading(true);
  const res = await getOverviewStatsApi(selectedYear, selectedMonth);
  if (res.code !== 1) {
    notify.error(res.message);
    setData(null);
  } else {
    setData(res.data);
  }
  setLoading(false);
}

async function getLecturerChartsAction() {
  const { setData, setLoading, selectedYear, selectedMonth, selectedDepartmentId } = useLecturerChartsStore.getState();
  setLoading(true);
  const res = await getLecturerChartsApi(selectedYear, selectedMonth, selectedDepartmentId);
  if (res.code !== 1) {
    notify.error(res.message);
    setData(null);
  } else {
    setData(res.data);
  }
  setLoading(false);
}

async function getResearchChartsAction() {
  const { setData, setLoading, selectedYear, selectedMonth, selectedDepartmentId } = useResearchChartsStore.getState();
  setLoading(true);
  const res = await getResearchChartsApi(selectedYear, selectedMonth, selectedDepartmentId);
  if (res.code !== 1) {
    notify.error(res.message);
    setData(null);
  } else {
    setData(res.data);
  }
  setLoading(false);
}
