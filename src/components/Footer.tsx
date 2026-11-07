import { nav, profile } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "./ui/Brand";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.25em] text-fg">{profile.displayName}</p>
          <p className="mt-2 text-sm text-muted">From the classroom to the cloud, and onto the field.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {nav.slice(1).map((n) => <li key={n.id}><a className="focus-ring rounded hover:text-fg" href={`#${n.id}`}>{n.label}</a></li>)}
        </ul>
        <div className="flex items-center gap-3 text-muted">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="focus-ring grid h-10 w-10 place-items-center rounded-full glass hover:text-fg"><LinkedInIcon /></a>
          {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="focus-ring grid h-10 w-10 place-items-center rounded-full glass hover:text-fg"><GitHubIcon /></a>}
          {profile.medium && <a href={profile.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="focus-ring grid h-10 w-10 place-items-center rounded-full glass hover:text-fg"><MediumIcon /></a>}
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted/70">© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
    </footer>
  );
}
