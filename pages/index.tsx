import type { NextPage } from "next";
import { PrismaClient } from "@prisma/client";
import { SyntheticEvent } from "react";
import { User } from "../types/user";

interface Props {
  users: User[];
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
}

const Home: NextPage<Props> = ({ users }) => {
  const createNewUser = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      const body = {
        name: "Mateo Nunez",
        email: "mateonunez95@gmail.com",
        password: "toor",
      };

      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <span className="text-2xl">Base Fullstack JavaScript by @mateonunez</span>

      <div>
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} [{user.email}] - {JSON.stringify(user.createdAt)}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <span>No users found</span>
          </>
        )}
      </div>

      <div>
        <button
          onClick={createNewUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create a New User
        </button>
      </div>
    </div>
  );
};

export default Home;
