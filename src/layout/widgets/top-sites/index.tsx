import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { FavoritesWidgetType } from "@/types/slice/bookmark";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function TopSites(props: FavoritesWidgetType) {
  const [hasPermissions, setHasPermissions] = useState(false);
  const askPermission = () => {
    chrome.permissions.request({ permissions: ["topSites"] }).then((res) => {
      setHasPermissions(res);
    });
  };

  useEffect(() => {
    chrome.permissions.contains({ permissions: ["topSites"] }).then((res) => {
      if (res === hasPermissions) return;
      setHasPermissions(res);
    });
  }, [hasPermissions]);

  if (!hasPermissions)
    return (
      <div className="flex-center flex-col gap-4">
        <div className="text-xl text-error-main"></div>
        Extension has no permission for Top Sites
        <Button onClick={askPermission}>Grant Permission</Button>
      </div>
    );

  return (
    <ScrollArea className="size-full">
      <div className="py2-">
        <Sites {...props} />
      </div>
    </ScrollArea>
  );
}

function Sites({ iconSize }: FavoritesWidgetType) {
  const [sites, setSites] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    chrome.topSites.get((sites) => {
      setSites(
        sites.map((s, index) => {
          return { ...s, id: `${index}` };
        })
      );
    });
  }, []);

  return <BookmarkGrid bookmarks={sites} folderSize={iconSize} />;
}

export default TopSites;
