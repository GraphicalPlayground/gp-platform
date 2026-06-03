import { Description, Label, Switch } from '@gp/react';
import React from 'react';

export function AllowNotificationsDemo() {
  return (
    <div className='flex w-full justify-center'>
      <Switch defaultSelected>
        <div className='flex gap-8 p-4'>
          <div className='-mt-0.5 flex flex-col justify-start gap-1'>
            <Label className='w-fit text-sm font-medium'>Allow notifications</Label>
            <Description>Receive push notifications from GPlayd</Description>
          </div>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </div>
      </Switch>
    </div>
  );
}
