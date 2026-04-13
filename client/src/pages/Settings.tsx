import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

const Settings = () => {
  return (
    <div className="section-shell flex min-h-[90vh] w-full flex-col items-center justify-center gap-6 p-4 py-12">
      <div className="text-center">
        <p className="premium-chip mx-auto mb-3 inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
          Account
        </p>
        <h1 className="text-3xl font-semibold text-gradient">Settings</h1>
      </div>

      <AccountSettingsCards
        classNames={{
          card: {
            base: "glass-card max-w-xl mx-auto border border-white/10",
            footer: "glass-card border border-white/10",
          },
        }}
      />
      <div className="w-full">
        <ChangePasswordCard
          classNames={{
            base: "glass-card max-w-xl mx-auto border border-white/10",
            footer: "glass-card border border-white/10",
          }}
        />
      </div>
      <div className="w-full">
        <DeleteAccountCard
          classNames={{
            base: "glass-card max-w-xl mx-auto border border-white/10",
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
