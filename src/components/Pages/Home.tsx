import PageLayout from "../Layouts/PageLayout";
import AccountingEntriesForm from "../forms/AccountingEntriesForm";

export default function Home() {
  return (
    <>
      <PageLayout>
        <h1>Home Page</h1>
      </PageLayout>
      <AccountingEntriesForm />
    </>
  );
}
