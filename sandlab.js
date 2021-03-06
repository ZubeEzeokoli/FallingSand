import java.awt.*;
import java.util.*;
import java.awt.Color.*;

public class SandLab
{
    public static void main(String[] args)
    {
        SandLab lab = new SandLab(120, 80);
        lab.run();
    }

    //add constants for particle types here
    public static final int EMPTY = 0;
    public static final int METAL = 1;
    public static final int WATER = 2;
    public static final int SAND = 3;
    public static final int FIRE = 4;
    public static final int GLASS = 5;
    public static final int ICE = 6;

    //do not add any more fields
    private int[][] grid;
    private SandDisplay display;

    public SandLab(int numRows, int numCols)
    {
        grid=new int[numRows][numCols];
        String[] names;
        names = new String[7];
        names[EMPTY] = "Empty";
        names[METAL] = "Metal";
        names[SAND] = "Sand";
        names[WATER] = "Water";
        names[FIRE] = "Fire";
        names[GLASS] = "Glass";
        names[ICE] = "Ice";

        display = new SandDisplay("Falling Sand", numRows, numCols, names);
    }

    //called when the user clicks on a location using the given tool
    private void locationClicked(int row, int col, int tool)
    {
        grid[row][col]=tool;
    }
    //copies each element of grid into the display
    public void updateDisplay()
    {

        for(int r=0; r<grid.length;r++)
        {
            for(int c=0; c<grid[r].length; c++)
            {
                if(grid[r][c]==EMPTY)
                {
                    display.setColor(r,c, new Color(0,0,0));
                }
                else if(grid[r][c]==METAL)
                {
                    display.setColor(r,c,new Color(67,70,75));
                }
                else if(grid[r][c]==WATER)
                {
                    display.setColor(r,c,new Color(0,119,190));
                }
                else if(grid[r][c]==SAND)
                {
                    display.setColor(r,c,new Color(194,178,128));
                }
                else if(grid[r][c]==FIRE)
                {
                    display.setColor(r,c,new Color(226,88,34));
                }
                else if(grid[r][c]==GLASS)
                {
                    display.setColor(r,c,new Color(168,204,215));
                }
                else if(grid[r][c]==ICE)
                {
                    display.setColor(r,c,new Color(195,203,217));
                }
            }
        }
    }

    //called repeatedly.
    //causes one random particle to maybe do something.
    public void step()
    {
        int r=(int)(Math.random()*grid.length);
        int c=(int)(Math.random()*grid[0].length);
        int i=(int)(Math.random()*3);

        if(grid[r][c]==SAND && r+1<=grid.length-1 )
        {
            if(grid[r+1][c]==WATER)
            {
                grid[r+1][c]=SAND;
                grid[r][c]=WATER;
            }
            else if (grid[r+1][c]==FIRE)
            {
                grid[r+1][c]=GLASS;
                grid[r][c]=EMPTY;
            }
            else if (grid[r+1][c]==EMPTY)
            {
                grid[r+1][c]=SAND;
                grid[r][c]=EMPTY;
            }
        }

        else if(grid[r][c]==WATER)
        {
            if(i==0&&c+1<=grid[0].length-1)
            {
                if(grid[r][c+1]==ICE)
                {
                    grid[r][c]=ICE;
                }
                else if( grid[r][c+1]==EMPTY)
                {
                    grid[r][c+1]=WATER;
                    grid[r][c]=EMPTY;
                }
            }
            else if(i==1&&c-1>=0)
            {
                if(grid[r][c-1]==ICE)
                {
                    grid[r][c]=ICE;
                }
                else if( grid[r][c-1]==EMPTY)
                {
                    grid[r][c-1]=WATER;
                    grid[r][c]=EMPTY;
                }
            }
            else if(i==2 &&r+1<=grid.length-1)
            {
                if(r+1<=grid.length-1 && grid[r+1][c]==ICE)
                {
                    grid[r][c]=ICE;
                }
                else if( grid[r+1][c]==EMPTY)
                {
                    grid[r+1][c]=WATER;
                    grid[r][c]=EMPTY;
                }
            }
        }

        else if(grid[r][c]==FIRE)
        {
            if(i==0 && c+1<=grid[0].length-1)
            {
                if(grid[r][c+1]==SAND)
                {
                    grid[r][c+1]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c+1]==GLASS)
                {
                    grid[r][c+1]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c+1]==ICE)
                {
                    grid[r][c+1]=WATER;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c+1]==EMPTY)
                {
                    grid[r][c+1]=FIRE;

                    grid[r][c]=EMPTY;
                }
            }
            if(i==1&&c-1>=0)
            {
                if(grid[r][c-1]==SAND)
                {
                    grid[r][c-1]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c-1]==GLASS)
                {
                    grid[r][c-1]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c-1]==ICE)
                {
                    grid[r][c-1]=WATER;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r][c-1]==EMPTY) 
                {
                    grid[r][c-1]=FIRE;
                }
                grid[r][c]=EMPTY;

            }
            if(i==2&&r+1<=grid.length-1)
            {
                if(grid[r+1][c]==SAND)
                {
                    grid[r+1][c]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r+1][c]==GLASS)
                {
                    grid[r+1][c]=GLASS;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r+1][c]==ICE)
                {
                    grid[r+1][c]=WATER;
                    grid[r][c]=EMPTY;
                }
                else if(grid[r+1][c]==EMPTY) 
                {
                    grid[r+1][c]=FIRE;
                }
                grid[r][c]=EMPTY;

            }

        }
    }

    //do not modify
    public void run()
    {
        while (true)
        {
            for (int i = 0; i < display.getSpeed(); i++)
                step();
            updateDisplay();
            display.repaint();
            display.pause(1);  //wait for redrawing and for mouse
            int[] mouseLoc = display.getMouseLocation();
            if (mouseLoc != null)  //test if mouse clicked
                locationClicked(mouseLoc[0], mouseLoc[1], display.getTool());
        }
    }
}