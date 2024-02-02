"use client";
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from '@/types/nav-types';

import { cn } from '@/lib/utils';
import { Icons } from '../icons';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) return null;

  return (
    <nav>{
      items.map((item, index) => {
        const Icon = Icons[item?.icon || "list"];
        const isActive = path === item.href;
        return item.href && (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent" : "transparent",
                item.disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.title}
            </span>
          </Link>
        );

      })
    }
    </nav>
  )
}

export default DashboardNav