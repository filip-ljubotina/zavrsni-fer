"use client";

import Divider from "@mui/joy/Divider";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";

import { FolderIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFolderListContext } from "@/providers/folder-list-provider";
import { FolderEdit } from "./_components/folder-edit";
import TableView from "./_components/table-view/table-view";
import CardView from "./_components/card-view";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Folder, Device } from "@/types/types";
import AddNewDevice from "./_components/add-new-device";
import ApiService from "@/services/api-service";
import { useCompaniesInfoContext } from "@/providers/companies-provider";

interface DashboardProps {
  params: {
    folderId: string;
  };
}

const Dashboard = ({ params }: DashboardProps) => {
  const [isCardView, setIsCardView] = useState(false);
  const [folder, setFolder] = useState<Folder>();
  const [devices, setDevices] = useState<Device[]>();
  const { companiesInfo, setCompniesInfo } = useCompaniesInfoContext();
  const router = useRouter();
  const { setActiveId, folders } = useFolderListContext();

  const fetchDevices = useCallback(async () => {
    try {
      const response = await ApiService.get(
        `/devices/getAllDevicesByFolderId/${params.folderId}`
      );

      setDevices(response.data);
    } catch (error) {
      alert("Something went wrong with fetchin folders.");
    }
  }, [params.folderId]);

  const fetchCompaniesInfo = useCallback(async () => {
    try {
      const response = await ApiService.get("/companies/getAllCompaniesInfo");
      setCompniesInfo(response.data);
    } catch (error) {
      alert("Something went wrong with fetchin folders.");
    }
  }, [setCompniesInfo]);

  useEffect(() => {
    fetchDevices();
    if (companiesInfo?.length === 0) {
      fetchCompaniesInfo();
    }
  }, [companiesInfo?.length, fetchCompaniesInfo, fetchDevices]);

  useEffect(() => {
    if (folders?.length === 0) {
      router.push("/dashboard");
      return;
    }

    const foundFolder = folders?.find(
      (folder) => folder.folderId === params.folderId
    );
    if (foundFolder) {
      setFolder(foundFolder);
    }
  }, [params.folderId, folders, router]);

  if (!folder || !devices || !companiesInfo) {
    return <div>Loading...</div>;
  }

  const filteredFolders = folders?.filter((folder) => {
    return folder.parentFolderId === params.folderId;
  });

  const navigateToFolder = (folderId: string) => {
    setActiveId(folderId);
    router.push(`/dashboard/folder/${folderId}`);
  };

  return (
    <main className="flex flex-1 overflow-y-auto flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="inline-flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{folder?.title}</h1>
        <FolderEdit params={{ folder }} />
      </div>
      {filteredFolders?.length !== 0 && (
        <>
          <Divider />
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Folders</h1>
          </div>
          <Grid
            key={"main-folder-grid"}
            container
            spacing={1}
            sx={{ flexGrow: 0.1 }}
          >
            {filteredFolders?.map((Folder) => (
              <Grid key={Folder.folderId}>
                <Card
                  sx={{ minWidth: 150, height: 50 }}
                  className="flex justify-center items-center transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigateToFolder(Folder.folderId);
                  }}
                >
                  <div className="flex items-center">
                    <FolderIcon className="mr-2" />
                    <Typography fontSize="lg" fontWeight="lg">
                      {Folder.title}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Divider />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Devices</h1>
        <div className="flex h-5 items-center space-x-4 text-sm px-6 ">
          <Button
            onClick={() => setIsCardView((prevView) => !prevView)}
            variant={isCardView ? "secondary" : "ghost"}
          >
            Card View
          </Button>
          <Separator orientation="vertical" />
          <Button
            onClick={() => setIsCardView((prevView) => !prevView)}
            variant={!isCardView ? "secondary" : "ghost"}
          >
            Table View
          </Button>
        </div>
        <AddNewDevice setDevices={setDevices} folder={folder} />
      </div>
      {!isCardView && <TableView devices={devices} />}
      {isCardView && <CardView devices={devices} />}
    </main>
  );
};

export default Dashboard;
