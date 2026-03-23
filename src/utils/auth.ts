export const setAuth = () => {
  const data = {
    user: {
      id: 2933,
      nickname: "송송이",
      teamId: "22-1",
      email: "ziy10273@naver.com",
    },
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjkzMywidGVhbUlkIjoiMjItMSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzc0MjU4NTA1LCJleHAiOjE3NzQyNjAzMDUsImlzcyI6InNwLWVwaWdyYW0ifQ.FotIZtVUG5TROWzdkUj_fN5MxeiC1GqPqpRq8gDXmWQ",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjkzMywidGVhbUlkIjoiMjItMSIsInNjb3BlIjoicmVmcmVzaCIsImlhdCI6MTc3NDI0Njk3MiwiZXhwIjoxNzc0ODUxNzcyLCJpc3MiOiJzcC1lcGlncmFtIn0.9aNszjAEWFWBpkMZh0gYk3-oGn-lcMvCjLX1ksMjAW8",
  };

  localStorage.setItem("auth", JSON.stringify(data));
};
