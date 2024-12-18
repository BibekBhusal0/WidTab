import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { treeNodeArray } from "@/types/slice/bookmark";
import { FavoritesWidgetType } from "@/types/slice/bookmark";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

function TopSites(props: FavoritesWidgetType) {
  const [hasPermissions, setHasPermissions] = useState(false);
  const askPermission = () => {
    browser.permissions.request({ permissions: ["topSites"] }).then((res) => {
      setHasPermissions(res);
    });
  };

  useEffect(() => {
    browser.permissions.contains({ permissions: ["topSites"] }).then((res) => {
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
    <ScrollArea className="size-full my-auto">
      <div className="py-2 my-auto">
        <Sites {...props} />
      </div>
    </ScrollArea>
  );
}

function Sites({ iconSize }: FavoritesWidgetType) {
  const [sites, setSites] = useState<treeNodeArray>([]);

  useEffect(() => {
    browser.topSites.get().then((sites) => {
      console.log(sites);
      setSites(
        sites.map((s, index) => ({
          id: `${index}`,
          title: s.title || "",
          url: s.url || "",
        }))
      );
    });
  }, []);

  return (
    <BookmarkGrid bookmarks={sites} folderSize={iconSize} contextMenu={false} />
  );
}

export default TopSites;
