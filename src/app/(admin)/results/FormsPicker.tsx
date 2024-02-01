"use client";
import React, { use, useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type SelectProps = {
  value: number,
  label?: string | null
}

type FormsPickerProps = {
  options: Array<SelectProps>
}

const FormsPicker = (props: FormsPickerProps) => {
  const { options } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formId = searchParams.get('formId') || options[0].value.toString();

  const createQueryString = useCallback((name: string, value: string) => {
    console.log('searchParams', searchParams);
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
    ;
  }, [searchParams])

  return (
    <div className='flex gap-2 items-center'>
      <Label className='font-bold'>Select a form</Label>
      <Select value={formId} onValueChange={(value) => {
        router.push(pathname + '?' + createQueryString('formId', value));
      }}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={options[0].label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) =>
              <SelectItem
                key={option.value}
                value={option.value.toString()}
              >{option.label}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>)
}

export default FormsPicker