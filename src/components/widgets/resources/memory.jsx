import useSWR from "swr";
import { FaMemory } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { useTranslation } from "next-i18next";

import UsageBar from "./usage-bar";

export default function Memory({ expanded }) {
  const { t } = useTranslation();

  const { data, error } = useSWR(`/api/widgets/resources?type=memory`, {
    refreshInterval: 1500,
  });

  if (error || data?.error) {
    return (
      <div className="flex-none flex flex-row items-center mr-3 py-1.5">
        <BiError className="text-theme-800 dark:text-theme-200 w-5 h-5" />
        <div className="flex flex-col ml-3 text-left">
          <span className="text-theme-800 dark:text-theme-200 text-xs">{t("widget.api_error")}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-none flex flex-row items-center mr-3 py-1.5 animate-pulse">
        <FaMemory className="text-theme-800 dark:text-theme-200 w-5 h-5" />
        <div className="flex flex-col ml-3 text-left min-w-[85px]">
          <span className="text-theme-800 dark:text-theme-200 text-xs flex flex-row justify-between">
            <div className="pl-0.5 pr-1">-</div>
            <div className="pr-1">{t("resources.free")}</div>
          </span>
          {expanded && (
            <span className="text-theme-800 dark:text-theme-200 text-xs flex flex-row justify-between">
              <div className="pl-0.5 pr-1">-</div>
              <div className="pr-1">{t("resources.total")}</div>
            </span>
          )}
          <UsageBar percent={0} />
        </div>
      </div>
    );
  }

  const percent = Math.round((data.memory.active / data.memory.total) * 100);

  return (
    <div className="flex-none flex flex-row items-center mr-3 py-1.5">
      <FaMemory className="text-theme-800 dark:text-theme-200 w-5 h-5" />
      <div className="flex flex-col ml-3 text-left min-w-[85px]">
        <span className="text-theme-800 dark:text-theme-200 text-xs flex flex-row justify-between">
          <div className="pl-0.5 pr-1">
            {t("common.bytes", { value: data.memory.available, maximumFractionDigits: 1, binary: true })}
          </div>
          <div className="pr-1">{t("resources.free")}</div>
        </span>
        {expanded && (
          <span className="text-theme-800 dark:text-theme-200 text-xs flex flex-row justify-between">
            <div className="pl-0.5 pr-1">
              {t("common.bytes", {
                value: data.memory.total,
                maximumFractionDigits: 1,
                binary: true,
              })}
            </div>
            <div className="pr-1">{t("resources.total")}</div>
          </span>
        )}
        <UsageBar percent={percent} />
      </div>
    </div>
  );
}
