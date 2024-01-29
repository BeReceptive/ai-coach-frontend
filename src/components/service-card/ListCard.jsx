import { CalendarIcon } from "@heroicons/react/20/solid";
import "./cards.scss";

const discussions = [
  {
    id: 1,
    title: "Back End Developer",
    position: "in Engineering",
    href: "#",
    author: { name: "Leslie Alexander", href: "#" },
    date: "Closing on January 7, 2020, 2d ago",
    dateTime: "2023-01-23T22:34Z",
    status: "active",
    totalComments: 24,
    commenters: [
      {
        id: 12,
        name: "Emma Dorsey",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 6,
        name: "Tom Cook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 4,
        name: "Lindsay Walton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 16,
        name: "Benjamin Russel",
        imageUrl:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 23,
        name: "Hector Gibbons",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Back End Developer",
    position: "in Engineering",
    href: "#",
    author: { name: "Michael Foster", href: "#" },
    date: "Closing on January 7, 2020, 2d ago",
    dateTime: "2023-01-23T19:20Z",
    status: "active",
    totalComments: 6,
    commenters: [
      {
        id: 13,
        name: "Alicia Bell",
        imageUrl:
          "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 16,
        name: "Benjamin Russel",
        imageUrl:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Dries Vincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export default function ListCard() {
  return (
    <ul className="list-card divide-y divide-gray-100 my-5">
      {discussions.map((discussion) => (
        <li
          key={discussion.id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap bg-white px-4 py-5 sm:px-6"
        >
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <a href={discussion.href} className="hover:underline">
                {discussion.title}{" "}
                <span className={"text-indigo-600"}>{discussion.position}</span>
              </a>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              {/*<p>*/}
              {/*    <a href={discussion.author.href} className="hover:underline">*/}
              {/*        {discussion.author.name}*/}
              {/*    </a>*/}
              {/*</p>*/}
              <CalendarIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <p>
                <time dateTime={discussion.dateTime}>{discussion.date}</time>
              </p>
            </div>
          </div>
          <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
            <div className="flex -space-x-0.5">
              <dt className="sr-only">Commenters</dt>
              {discussion.commenters.map((commenter) => (
                <dd key={commenter.id}>
                  <img
                    className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                    src={commenter.imageUrl}
                    alt={commenter.name}
                  />
                </dd>
              ))}
            </div>
            <div className="flex w-25 gap-x-2.5">
              <button
                type="button"
                className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                Give Feedback
              </button>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
