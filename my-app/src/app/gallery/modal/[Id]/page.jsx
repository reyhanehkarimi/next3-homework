import { InterceptingRoutes, ParallelRoutes } from 'next/navigation';
import ModalPage from './modal/[id]/page'; 

export default function Layout({ children }) {
  return (
    <div>
      <InterceptingRoutes>
        <div className="h-full">{children}</div>
      </InterceptingRoutes>

      <ParallelRoutes>
        <Route
          name="modal"
          path="/gallery/modal/[id]"
          component={ModalPage}
        />
      </ParallelRoutes>
    </div>
  );
}
