import axios from "axios";
import { getConfigJson } from "../scripts/baiduwangpan/utils";

type NUmberOrString = number | string;

export enum Order {
  ASC,
  DESC,
}

interface GetListApi {
  clienttype?: NUmberOrString;
  app_id?: NUmberOrString;
  web?: NUmberOrString;
  "dp-logid"?: NUmberOrString;
  order?: "name" | "time";
  desc?: Order;
  dir: string;
  num: NUmberOrString;
  page: NUmberOrString;
}

export interface ListItem {
  server_filename: string;
  isdir: 0 | 1;
  path: string;
}

export const getListApi = (params: GetListApi) => {
  const { cookie } = getConfigJson();
  return axios.get("https://pan.baidu.com/api/list", {
    params: {
      clienttype: 0,
      app_id: 250528,
      web: 1,
      "dp-logid": 51958500685690690038,
      order: "name",
      desc: Order.ASC,
      ...params,
    },
    headers: { Cookie: cookie },
  });
};
