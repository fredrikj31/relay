import { cn } from "@shadcn-ui/lib/utils";

interface MessageBubbleProps {
  isOwn: boolean;
  message: {
    content: string;
  };
}
export const MessageBubble = ({ isOwn, message }: MessageBubbleProps) => {
  return (
    <div className={cn(isOwn && "pl-8", !isOwn && "pr-8")}>
      <div
        className={cn(
          "flex flex-col gap-1 py-2.5 px-4 rounded-2xl w-fit lg:max-w-1/2",
          isOwn && "bg-blue-500 text-white rounded-br-sm ml-auto",
          !isOwn && "bg-slate-100 text-slate-800 rounded-bl-sm",
        )}
      >
        <p className="text-sm">{message.content}</p>
        <time
          className={cn(
            "text-xs text-right",
            isOwn && "text-blue-100",
            !isOwn && "text-slate-500",
          )}
        >
          10:30 AM
        </time>
      </div>
    </div>
  );
};
