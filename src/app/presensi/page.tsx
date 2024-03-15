"use client";
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import Link from "next/link";

export default function page() {
  const [filterDate, setFilterDate] = useState(""); // state for filter date
  const [filteredData, setFilteredData] = useState([]); // state for filtered data
  const [dataAbsen, setDataAbsen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/absensi");
        const data = await res.json();
        // Memformat nilai tanggalAbsen
        const formattedData = data.datas.map((item: any) => {
          return {
            ...item,
            tanggalAbsen: item.tanggalAbsen.substring(0, 10),
          };
        });
        setDataAbsen(formattedData);
        setFilteredData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (filterDate === "") {
      setFilteredData(dataAbsen);
    } else {
      setFilteredData(
        dataAbsen.filter((item: any) => item.tanggalAbsen === filterDate)
      );
    }
  }, [filterDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tabs = [
    {
      title: "Website ",
      value: "Website ",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Web Programming</p>
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-4 my-4 rounded-md text-purple-700 text-md"
          />
          <WebTable data={filteredData} />
        </div>
      ),
    },
    {
      title: "Mobile",
      value: "Mobile",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Mobile Programming</p>
          <MobileTable data={dataAbsen} />
        </div>
      ),
    },
    {
      title: "Cyber",
      value: "Cyber",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Cyber Security</p>
          <CyberTable data={dataAbsen} />
        </div>
      ),
    },
  ];

  return (
    <div className="dark h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
      <Link href="/" className="z-50 text-md font-medium cursor-pointer my-4">
        &larr; Home
      </Link>
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return <p>yaudah</p>;
};

const LayoutTable = ({ children }: any) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className=" max-h-[200px] md:max-h-full overflow-y-auto md:overflow-y-hidden">
            <table className="min-w-full text-left text-[16px] font-light text-surface dark:text-white ">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Kelas
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tanggal Absen
                  </th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const WebTable = ({ data }: any) => {
  return (
    <LayoutTable>
      {data
        .filter((item: any) => item.kelas === "Web Programming")
        .map((item: any, index: number) => (
          <tr
            key={index}
            className="border-b border-neutral-200 dark:border-white/10"
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.nama}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.kelas}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.tanggalAbsen}</td>
          </tr>
        ))}
    </LayoutTable>
  );
};
const MobileTable = ({ data }: any) => {
  return (
    <LayoutTable>
      {data
        .filter((item: any) => item.kelas === "Mobile Programming")
        .map((item: any, index: number) => (
          <tr
            key={index}
            className="border-b border-neutral-200 dark:border-white/10"
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.nama}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.kelas}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.tanggalAbsen}</td>
          </tr>
        ))}
    </LayoutTable>
  );
};

const CyberTable = ({ data }: any) => {
  return (
    <LayoutTable>
      {data
        .filter((item: any) => item.kelas === "Cyber Security")
        .map((item: any, index: number) => (
          <tr
            key={index}
            className="border-b border-neutral-200 dark:border-white/10"
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.nama}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.kelas}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.tanggalAbsen}</td>
          </tr>
        ))}
    </LayoutTable>
  );
};
