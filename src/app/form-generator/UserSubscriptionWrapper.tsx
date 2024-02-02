import React from 'react'
import { auth } from '@/auth'
import { getUserSubscription } from '@/app/actions/userSubscriptions'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { users, forms } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { MAX_FREE_FROMS } from '@/lib/utils'
import { Lock } from "lucide-react";

type Props = {
  children: React.ReactNode
}

const UserSubscriptionWrapper = async ({ children }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const subscription = await getUserSubscription({ userId });
  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId)
  })
  const userFormsCount = userForms.length;

  if (subscription || userFormsCount < MAX_FREE_FROMS) {
    return { children };
  }

  return (
    <Button disabled><Lock className='w-4 h-4 mr-2' />Upgrade to create more forms</Button>
  )
}

export default UserSubscriptionWrapper