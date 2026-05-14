import { PanelLeftOpen } from "lucide-react";
import { ContactList } from "../../components/ContactList";
import { useNavbar } from "../../providers/navbar";

export const ContactsContentRoute = () => {
  const { setIsNavbarOpen } = useNavbar();

  return (
    <div className="flex flex-row w-full">
      <div className="md:block hidden">
        <ContactList />
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-5 pt-6 pb-4">
          <button
            className="size-8 md:hidden text-muted-foreground flex items-center justify-center"
            onClick={() => setIsNavbarOpen(true)}
          >
            <PanelLeftOpen size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <h1>hej med dig</h1>
        </div>
      </div>
    </div>
  );
};
