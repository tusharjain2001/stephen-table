import { createContext, useContext } from 'react';

// Opens the volunteer sign-up popup, which Layout mounts once for the whole
// site so any button on any page (Get Involved's "Sign up for Volunteering",
// the footer's "Volunteer") can open the same form without a route change.
export const VolunteerFormContext = createContext(() => {});

export function useOpenVolunteerForm() {
  return useContext(VolunteerFormContext);
}
