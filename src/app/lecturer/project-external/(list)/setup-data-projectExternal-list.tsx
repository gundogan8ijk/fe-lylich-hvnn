'use client';

import { getListProjectExternalAction } from "@/ProjectExternal-Lecturer-List/ProjectExternal-List-hook";
import { useEffect } from "react";

export default function SetupDataProjectExternalList() {
  useEffect(() => {
    getListProjectExternalAction();
  }, []);

  return null;
}