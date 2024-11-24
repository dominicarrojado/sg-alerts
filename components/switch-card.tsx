import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Routes, SubscriptionTopic } from "@/lib/enums";

type Props = {
  id: SubscriptionTopic;
  name: string;
  title: string;
  description: ReactNode;
  topicRoute?: Routes;
  disabled: boolean;
  checked: boolean;
  onClick: (id: SubscriptionTopic) => void;
};

export default function SwitchCard(props: Props) {
  const {
    id,
    name,
    title,
    description,
    disabled,
    checked,
    topicRoute,
    onClick,
  } = props;

  return (
    <div className="rounded-lg border p-4">
      <Label
        htmlFor={id}
        className="flex flex-row items-center justify-between"
      >
        <div className="space-y-0.5 pr-2">
          <p className="text-base">{title}</p>
          <p className="text-sm font-light text-muted-foreground">
            {description}
          </p>
        </div>
        <Switch
          id={id}
          name={name}
          disabled={disabled}
          checked={checked}
          onClick={() => onClick(id)}
        />
      </Label>
      {topicRoute && (
        <Button variant="link" className="mt-2 h-auto p-0 font-normal" asChild>
          <Link href={topicRoute}>
            View Details
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
