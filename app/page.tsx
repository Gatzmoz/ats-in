import Forms from "@/components/forms";
import PDFPreview from "@/components/pdf-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PDFViewer } from "@react-pdf/renderer";

function Home() {
  return (
    <main className="h-screen">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-w-screen rounded-lg border border-blue-400"
      >
        <ResizablePanel defaultSize="50%" minSize="40%">
          <Forms />
        </ResizablePanel>
        <ResizableHandle withHandle={true} className="bg-blue-400" />
        <ResizablePanel defaultSize="50%" minSize="40%">
          <PDFPreview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default Home;
