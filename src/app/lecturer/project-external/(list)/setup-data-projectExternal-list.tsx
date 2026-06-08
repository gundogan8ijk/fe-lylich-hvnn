'use client';

import { getListProjectExternalAction } from '@/working-Lecturer/ProjectExternal-List/ProjectExternal-List-hook';
import { useEffect } from "react";

export default function SetupDataProjectExternalList() {
  useEffect(() => {
    getListProjectExternalAction();
  }, []);

  return null;
}