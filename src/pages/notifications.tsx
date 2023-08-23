import { unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import Layout from '@/components/layouts/main-layout';
import Head from 'next/head';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import NotificationsList from '@/components/notifications/notifications-list';
import Button from '@/components/common/button';
import Filters from '@/components/user-profile/profile-filters';
import useNotifications from '@/components/notifications/use-notifications';

const Notifications = () => {
  const { filterData, handleMarkAsRead } = useNotifications(); // Using the useNotifications to get filterData and handleMarkAsRead functions

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center items-center">
          <Filters filters={filterData} />
          <Button isSmall className="mx-auto my-5" onClick={handleMarkAsRead}>
            mark all as read
          </Button>
          <NotificationsList />
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  ); // Fetching the server session using unstable_getServerSession function with request, response, and authOptions

  if (!session) { // If there is no session, redirect to the signin page
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Notifications; 