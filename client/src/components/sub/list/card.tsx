import { SubRestart } from "./modal/restart";
import { SubChange } from "./modal/change";
import { Button } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { PlansProps, SubProps } from "@/types";
import millify from "millify";

interface SubListCardProps {
  plan: PlansProps;
  sub: SubProps | undefined;
  period: "monthly" | "annual";
}

export function SubListCard({ plan, sub, period }: SubListCardProps) {
  const content = useIntlayer("sub-content");
  return (
    <div
      className={`rounded-xl px-6 pt-6 pb-8 flex flex-col h-90 ${
        plan.title === sub?.title
          ? "bg-primary/20"
          : "border border-default-200"
      }`}
    >
      <h2 className="font-semibold text-lg sm:text-xl">{plan.title}</h2>
      <p className="text-sm text-default-500 mt-4">{plan.description}</p>
      {plan.title !== "Enterprise" ? (
        <div className="mt-2">
          <p className="text-sm font-semibold">
            {`${millify(
              Number(
                period === "monthly" ? plan.monthly_credit : plan.annual_credit
              ),
              { precision: 2 }
            )} ${
              period === "monthly"
                ? content.card.credit_range.monthly.value
                : content.card.credit_range.annual.value
            }`}
          </p>
        </div>
      ) : null}
      <div className="flex-1 flex flex-col justify-end">
        {plan.title !== "Enterprise" ? (
          <div className="space-y-8">
            <p className="space-x-2">
              <span className="text-xl sm:text-2xl">
                {millify(
                  Number(
                    period === "monthly"
                      ? plan.monthly_price
                      : plan.annual_price
                  ),
                  { precision: 2 }
                )}
                &nbsp;UZS
              </span>
              <span className="text-default-500">
                {period === "monthly"
                  ? content.card.price_range.monthly.value
                  : content.card.price_range.annual.value}
              </span>
            </p>
            <div
              className={
                sub?.title === "Free" && plan.title === "Free"
                  ? "invisible"
                  : "visible"
              }
            >
              {sub?.title === plan.title ? (
                <SubRestart />
              ) : (
                <SubChange plan={plan.title} period={period} />
              )}
            </div>
          </div>
        ) : (
          <Button fullWidth color="primary">
            {content.card.buttons.contact}
          </Button>
        )}
      </div>
    </div>
  );
}
