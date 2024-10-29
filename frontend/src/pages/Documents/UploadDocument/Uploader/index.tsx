import { useRef } from "react";
import { Text, Group, Button, rem } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import Papa from "papaparse";
import { DocumentLine } from "~/services";
import { csvToJson } from "~/utils/csvUtils.ts";
import { parseRawObject } from "~/utils/parsers.ts";
import { documentRowSchema } from "./schema.ts";

interface UploaderProps {
  onDocument: (lines: DocumentLine[]) => void;
}

export const Uploader = ({ onDocument }: UploaderProps) => {
  const openRef = useRef<() => void>(null);

  const onDrop = (files: FileWithPath[]) => {
    const file = files[0];
    if (!file) {
      return;
    }

    Papa.parse(file, {
      complete(results) {
        const lines = csvToJson(results.data);

        onDocument(lines.map((line) => parseRawObject<DocumentLine>(line, documentRowSchema)));
      },
    });
  };

  return (
    <div className="mx-auto my-5 flex flex-col justify-center items-center">
      <Dropzone
        openRef={openRef}
        maxFiles={1}
        onDrop={onDrop}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>
          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload Document</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that are less than 30mb in
            size.
          </Text>
        </div>
      </Dropzone>

      <Button className="mt-4" size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select file
      </Button>
    </div>
  );
};
