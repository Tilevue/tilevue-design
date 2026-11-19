/**
 * Book cover that swings open in 3D when its parent `.group` is hovered.
 * Values: perspective 1200px, rotateY(-35deg)
 * around the bottom-left corner, 20px thick with a white page edge and a coloured back cover.
 */
export function Book3D({ cover, backColor = "#1e53f0" }: { cover: string; backColor?: string }) {
  return (
    <div className="relative h-16 w-[43px]">
      <div className="relative size-full origin-bottom-left transition-transform duration-500 ease-spring transform-3d [transform:perspective(1200px)] group-hover:[transform:perspective(1200px)_translateZ(45px)_rotateY(-35deg)]">
        {/* back cover, 20px behind */}
        <div
          className="absolute inset-y-0 right-0 left-px rounded-[2px] [transform:perspective(1200px)_translateZ(-20px)]"
          style={{ backgroundColor: backColor }}
        />
        {/* page edge, turned 90° to face right */}
        <div className="absolute top-px left-[35px] h-[62px] w-[10px] bg-white opacity-0 transition-opacity duration-300 ease-smooth [transform:perspective(1200px)_translateZ(-10px)_rotateY(90deg)] group-hover:opacity-100" />
        {/* front cover */}
        <div className="relative size-full overflow-hidden rounded-[2px]">
          <img src={cover} alt="" className="size-full object-cover" />
          {/* spine highlight + soft inner light */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-neutral-500 via-black to-neutral-400 opacity-20" />
          <div className="absolute inset-0 rounded-[2px] shadow-[inset_0_1px_2px_rgb(255_255_255/0.43),inset_1px_0_3px_rgb(0_0_0/0.15)]" />
        </div>
      </div>
    </div>
  );
}
