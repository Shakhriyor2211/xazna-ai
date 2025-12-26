"use client";

import { SubInfoProps } from "@/types";
import { useIntlayer } from "next-intlayer";

interface SubInfoTableProps {
  plan: SubInfoProps["plan"];
  rate: SubInfoProps["rate"];
  cost: SubInfoProps["mdl"][number] | null;
  tool: string;
}

export function SubInfoTable({ plan, rate, cost, tool }: SubInfoTableProps) {
  const content = useIntlayer("sub-content");

  return (
    <div className="border border-default-300 w-[[calc(100wv-64px)]] overflow-hidden lg:w-auto overflow-x-auto rounded-lg text-sm text-default-700 dark:text-white">
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-default-300 p-3">#</th>
            {plan.map((p, i) => (
              <th
                key={i}
                className="border-b border-default-300  p-3 uppercase"
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-r border-default-300 p-3 font-medium">
              {content.table.head.credit_rate}
            </td>
            {rate.map((r, i) => (
              <td
                key={i}
                className="border-b not-last:border-r border-default-300 p-3 text-center"
              >
                {r.credit_limit}&nbsp;({r.credit_time}&nbsp;
                {content.table.minute})
              </td>
            ))}
          </tr>
          {tool === "llm" && (
            <tr>
              <td className="border-b border-r border-default-300 p-3 font-medium">
                {content.table.head.session_rate}
              </td>
              {rate.map((r, i) => (
                <td
                  key={i}
                  className="border-b not-last:border-r border-default-300 p-3 text-center"
                >
                  {r.session_limit}&nbsp;({r.context_limit}&nbsp;
                  {content.table.character})
                </td>
              ))}
            </tr>
          )}
          <tr>
            <td className="border-b not-last:border-r border-default-300 p-3 font-medium">
              {content.table.head.credit_usage}
            </td>
            <td
              colSpan={plan.length}
              className="border-b not-last:border-r border-default-300 p-3 text-center"
            >
              {cost?.credit}/{content.table.character}
            </td>
          </tr>

          <tr>
            <td className="not-last:border-r border-default-300 p-3 font-medium">
              {content.table.head.cash_usage}
            </td>
            <td
              colSpan={plan.length}
              className="not-last:border-r border-default-300 p-3 text-center"
            >
              {cost?.cash} UZS/{content.table.character}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
