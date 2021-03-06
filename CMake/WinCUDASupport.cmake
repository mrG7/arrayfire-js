function(win_cuda_support)
    if(WIN32)
        set(cuda_path "$ENV{CUDA_PATH}")
        if (cuda_path)
            message(STATUS "Creating target to copy CUDA DLLs to module binary folder.")
            file(TO_CMAKE_PATH "${cuda_path}/nvvm/bin" cuda_dll_path)
            message(STATUS "Searching CUDA DLLs in: ${cuda_dll_path}")
            file(GLOB cuda_dll "${cuda_dll_path}/nvvm64*.dll")
            if (cuda_dll)
                message(STATUS "CUDA DLL found: ${cuda_dll}")
                foreach(dll ${cuda_dll})
                  add_custom_command(TARGET ${PROJECT_NAME}_CUDA POST_BUILD
                                     COMMAND ${CMAKE_COMMAND} -E
                                         copy "${cuda_dll}" $<TARGET_FILE_DIR:${PROJECT_NAME}_CUDA>)
                endforeach()
            endif()
        endif()
    endif(WIN32)
endfunction(win_cuda_support)